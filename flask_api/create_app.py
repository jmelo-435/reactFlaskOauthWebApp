from flask import Flask
from .src.auth_endpoints import create_user,login, change_password, request_reset_password_web, grant_refresh_and_session_token, login_google,authorize_google,log_out,confirm_email, login_web,request_reset_password, reset_password,login_google_token,test, resend_confirmation_email,grant_refresh_and_session_token_web
from .env_var import get_app_secret_key



application = Flask(__name__)
application.debug = True
application.secret_key = get_app_secret_key()


application.add_url_rule('/api', 'test', test, methods=['OPTIONS','GET'])
application.add_url_rule('/api/users', 'ctUser', create_user, methods=['PUT','OPTIONS'])
application.add_url_rule('/api/users', 'login', login, methods=['POST','OPTIONS'])
application.add_url_rule('/api/web/users', 'loginWeb', login_web, methods=['POST','OPTIONS','PUT'])
application.add_url_rule('/api/user/password', 'changePass', change_password, methods=['POST'])
application.add_url_rule('/api/user/password_reset', 'reqResetPass', request_reset_password, methods=['POST'])
application.add_url_rule('/api/web/user/password_reset', 'reqResetPassWeb', request_reset_password_web, methods=['POST','OPTIONS'])
application.add_url_rule('/api/user/password/<token>', 'resetPass', reset_password, methods=['GET'])
application.add_url_rule('/api/user/refresh_token', 'refreshToken', grant_refresh_and_session_token, methods=['GET'])
application.add_url_rule('/api/web/user/refresh_token', 'refreshTokenWeb', grant_refresh_and_session_token_web, methods=['GET',"OPTIONS"])
application.add_url_rule('/api/users/google', 'loginGoogle', login_google, methods=['GET'])
application.add_url_rule('/api/authorize/google', 'authGoogle', authorize_google, methods=['GET'])
application.add_url_rule('/api/user/logout', 'logout', log_out, methods=['GET'])
application.add_url_rule('/api/user/email/<token>', 'confirm', confirm_email, methods=['GET'])
application.add_url_rule('/api/users/google_token', 'loginGoogleToken', login_google_token, methods=['POST'])
application.add_url_rule('/api/users/email_confirmation', 'emailConf', resend_confirmation_email, methods=['POST','OPTIONS'])



if __name__ == '__main__':
    application.run(port = 5001, host='0.0.0.0')