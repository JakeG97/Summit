from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Game
from app import db
import random
user_routes = Blueprint('users', __name__)


# * -----------  GET  --------------
#Query for all users and returns them in a list of user dictionaries

@user_routes.route('/')
@login_required
def users():

    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/current')
@login_required
def get_current_user():
    user = User.query.get(current_user.id)
    return user.to_dict()

# * -----------  GET  --------------
# Search all users by their username
@user_routes.route('/<string:username>')
@login_required
def search_all_users(username):
    users = User.query.filter(User.username.like(f"{username}%")).all()
    return [user.to_dict_search() for user in users]


# * -----------  GET  --------------
# Query for a user by id and returns that user in a dictionary

@user_routes.route('/<int:id>')
@login_required
def user(id):

    user = User.query.get(id)
    return user.to_dict()


# * -----------  GET  --------------
# Returns all the games that the user owns

@user_routes.route('/<int:user_id>/games')
@login_required
def get_user_games(user_id):
    user = User.query.get(user_id)

    if user:
        games = Game.query.filter_by(owner=user).all()
        return [game.to_dict() for game in games]
    else:
        return {'error': 'User not found'}, 404

#? -----------  PUT  --------------
#  Update a user by id and returns that user in a dictionary

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):

    user = User.query.get(id)

    if not user:
        return 'User not found', 404

    user.username = request.json.get('username', user.username)
    user.email = request.json.get('email', user.email)
    user.hashed_password = request.json.get('password', user.password)
    user.profile_picture = request.json.get('profile_picture', user.profile_picture)
    db.session.commit()
    return user.to_dict()


# ! -----------  DELETE  --------------
# Delete a user by id and returns a success message

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):

    user = User.query.get(id)
    if user is None:
        return 'User not found', 404


    if user.id != current_user.id:
        return {"message": "Unauthorized"}, 401

    db.session.delete(user)
    db.session.commit()

    return {"message": "Successfully Deleted!"}, 200
