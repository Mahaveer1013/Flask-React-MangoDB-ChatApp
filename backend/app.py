from flask import Flask,session,render_template,request,redirect,url_for
from flask_login import LoginManager,login_user,logout_user,login_required,current_user
from bson.json_util import dumps
from flask_socketio import SocketIO,join_room
from db import *
from datetime import datetime
from user import *
from pymongo.errors import *

app=Flask(__name__)
socketio=SocketIO(app)
login_manager=LoginManager()
login_manager.login_view='login'
login_manager.init_app(app)
app.config['SECRET_KEY'] = 'your_secret_key_here'

@login_manager.user_loader
def load_user(username):
    return get_user(username)

@app.route('/')
def home():
    rooms=[]
    if current_user.is_authenticated:
        rooms=get_rooms_for_user(current_user.username)
        print('rooms \n',rooms)
    return render_template('index.html',rooms=rooms)

@app.route('/login',methods=['POST','GET'])
def login():
    message=''
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method=='POST':
        username=request.form.get('username')
        password=request.form.get('password')
        user=get_user(username)
        if user:
            print('user found\n\n')
            if user.check_password(password):
                print('password right \n\n')
                login_user(user)
                return redirect(url_for('home'))
            else:
                print('wrong pass')
        else:
            message='failed to login'
        return render_template('login.html',message=message)

    return render_template('login.html')

@app.route('/signup',methods=['POST','GET'])
def signup():
    message=''
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method=='POST':
        username=request.form.get('username')
        email=request.form.get('email')
        password=request.form.get('password')
        try:
            save_user(username,email,password)
            return redirect('/login')
        except DuplicateKeyError:
            message='Username Already Exists'
            
            
    return render_template('signup.html',message=message)

    # return render_template('login.html')



@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/create-room',methods=['POST','GET'])
@login_required
def create_room():
    message=''
    if request.method=='POST':
        room_name=request.form.get('room_name')
        usernames=[username.strip() for username in request.form.get('members').split(',')]

        if len(room_name) and len(usernames):
            room_id=save_room(room_name,current_user.username)
            if current_user.username in usernames:
                usernames.remove(current_user.username)
            add_room_members(room_id,room_name,usernames,current_user.username)
            return redirect(url_for('view_room',room_id=room_id))
        else:
            message='failed to create room'

    return render_template('create_room.html',message=message)

@app.route('/rooms/<room_id>/edit',methods=['POST','GET'])
@login_required
def edit_room(room_id):
    room=get_room(room_id)
    if room and is_room_admin(room_id,current_user.username):
        existing_room_members=[member['_id']['username'] for member in get_room_members(room_id)]
        message=''
        room_members_str=','.join(existing_room_members)
        if request.method=='POST':
            room_name=request.form.get('room_name')
            room['room_name']=room_name
            update_room(room_id,room_name)
            new_members=[username.strip() for username in request.form.get('members').split(',')]

            members_to_add = list(set(new_members) - set (existing_room_members))
            members_to_remove = list(set(existing_room_members) - set (new_members))

            if len(members_to_add):
                add_room_members(room_id,room_name,members_to_add,current_user.username)
                
            if len(members_to_remove):
                remove_room_members(room_id,members_to_remove)
            room_members_str=request.form.get('members')
            message='Room Edited Successfully'
        return render_template('edit_room.html', room=room, room_members_str=room_members_str,message=message)
    else:
        return 'room not found',404

@app.route('/rooms/<room_id>/')
@login_required
def view_room(room_id):
    room=get_room(room_id)
    print(room)
    if room and is_room_member(room_id,current_user.username):
        room_members=get_room_members(room_id)
        messages=get_messages(room_id)
        return render_template('view_room.html',messages=messages ,username=current_user.username,room_members=room_members,room=room)
    else:
        return 'room not found',404

@app.route('/rooms/<room_id>/messages/')
@login_required
def get_older_messages(room_id):
    room=get_room(room_id)
    print(room)
    if room and is_room_member(room_id,current_user.username):
        page=request.args.get('page',0)
        messages=get_messages(room_id, page)
        # room_members=get_room_members(room_id)
        # messages=get_messages(room_id)
        # print(messages)
        return dumps(messages)
    else:
        return 'room not found',404

@socketio.on('send_message')
def handle_send_message_event(data):
    app.logger.info("{} has sent a message to the room {} : {}".format(data['username'], data['room'], data['msg']))
    data['created_at']=datetime.now().strftime("%d %b, %H:%M")
    save_message(data['room'], data['msg'], data['username'])
    socketio.emit('receive_msg', data=data)

if __name__=='__main__':
    socketio.run(app,debug=True)
