# from werkzeug.security import check_password_hash
# from flask_login import UserMixin


# class User(UserMixin):

#     def __init__(self, username, email, password):
#         self.username = username
#         self.email = email
#         self.password = password

#     @staticmethod
#     def is_authenticated():
#         print('authenticated ...')
#         return True

#     @staticmethod
#     def is_active():
#         return True

#     @staticmethod
#     def is_anonymous():
#         return False

#     def get_id(self):
#         print('username is : ',self.username)
#         username=self.username
#         return username

#     def check_password(self, password_input):
#         return check_password_hash(self.password, password_input)