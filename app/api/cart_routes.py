from flask import Blueprint, jsonify, request
from app.models import User, Game, CartGame, db
from flask_login import current_user, login_required
from sqlalchemy.exc import IntegrityError

cart_routes = Blueprint('cart_games', __name__)


# * -----------  GET  --------------
# Returns a list of all games that are currently in the user's cart

@cart_routes.route('')
@login_required
def get_cart_games():
    cart_games = current_user.cart_games
    return jsonify([cart_game.to_dict() for cart_game in cart_games])



#TODO -----------  POST  --------------
# Add a game into your shopping cart list

@cart_routes.route('', methods=['POST'])
@login_required
def add_to_cart():
    game_id = request.json.get('game_id')
    if not game_id:
        return jsonify({'error': 'game_id is required'}), 400

    # Check if the game exists
    game = Game.query.get(game_id)
    if not game:
        return jsonify({'error': 'game not found'}), 404

    # Add the game to the cart
    cart_game = CartGame(user_id=current_user.id, game_id=game_id)
    db.session.add(cart_game)
    db.session.commit()

    return jsonify({'success': f'{game.title} added to cart'})