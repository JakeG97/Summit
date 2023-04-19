from flask import Blueprint, redirect, request
from app.models import User, Game, Review, db
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf


game_routes = Blueprint('games', __name__)


# * -----------  GET  --------------
# Returns all games that are listed on the landing page(store) for purchase

@game_routes.route('')
def get_all_games():
    games = Game.query.all()
    return ([game.to_dict_simple() for game in games])



# * -----------  GET  --------------
# Returns all details of a single game

@game_routes.route('/<int:game_id>')
def get_single_game(game_id):
    game = Game.query.get(game_id)
    return game.to_dict()
