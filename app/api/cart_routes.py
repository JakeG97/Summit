from flask import Blueprint, jsonify, request
from app.models import User, Game, CartGame, LibraryGame, db
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

    # Check if the user already owns the game
    if LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first():
        return jsonify({'error': 'This game is already in your library'}), 400

    # Check if the game is already in the cart
    if CartGame.query.filter_by(user_id=current_user.id, game_id=game_id).first():
        return jsonify({'error': 'game is already in cart'}), 400

    # Add the game to the cart
    cart_game = CartGame(user_id=current_user.id, game_id=game_id)
    db.session.add(cart_game)
    db.session.commit()

    return jsonify({'success': f'{game.title} added to cart'})



#TODO -----------  POST  --------------
#Add single game to library

@cart_routes.route('/add-to-library', methods=['POST'])
@login_required
def add_to_library():
    game_id = request.json.get('game_id')
    if not game_id:
        return jsonify({'error': 'game_id is required'}), 400

    # # Check if the game exists
    # game = Game.query.get(game_id)
    # if not game:
    #     return jsonify({'error': 'game not found'}), 404

    # Check if the user already owns the game
    if LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first():
        return jsonify({'error': 'This game is already in your library'}), 400

    # Check if the game is in the cart
    cart_game = CartGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()
    if not cart_game:
        return jsonify({'error': 'game is not in cart'}), 400

    # Add the game to the library
    library_game = LibraryGame(user_id=current_user.id, game_id=game_id)
    db.session.add(library_game)

    # Remove the game from the cart
    db.session.delete(cart_game)

    db.session.commit()

    # Get the most up-to-date version of the LibraryGame object
    library_game = LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()

    return jsonify("success")






# # Add all games in cart to user's library

# # Add all games in cart to user's library
# @cart_routes.route('/add-to-library', methods=['POST'])
# @login_required
# def add_cart_to_library():
#     user_id = current_user.id
#     cart_games = CartGame.query.filter_by(user_id=user_id).all()
#     added_games = []
#     added_game_ids = set()

#     # Group cart games by game_id and user_id
#     grouped_cart_games = {}
#     for cart_game in cart_games:
#         if (cart_game.game_id, cart_game.user_id) in grouped_cart_games:
#             grouped_cart_games[(cart_game.game_id, cart_game.user_id)].append(cart_game)
#         else:
#             grouped_cart_games[(cart_game.game_id, cart_game.user_id)] = [cart_game]

#     for (game_id, user_id), cart_games in grouped_cart_games.items():
#         game = Game.query.get(game_id)
#         if game:
#             if LibraryGame.query.filter_by(user_id=user_id, game_id=game_id).first():
#                 continue
#             elif game_id in added_game_ids:
#                 continue
#             else:
#                 library_game = LibraryGame(user_id=user_id, game_id=game_id)
#                 db.session.add(library_game)
#                 added_games.append(game.to_dict())
#                 added_game_ids.add(game_id)
#         else:
#             continue

#     # Remove all games in cart after adding to user's library
#     CartGame.query.filter_by(user_id=user_id).delete()
#     db.session.commit()

#     return jsonify({added_games}), 200









#! -----------  DELETE  -------------- 
# Remove specific game from cart

@cart_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def remove_game_from_cart(game_id):

    # Get the current user's cart
    user_id = current_user.get_id()
    cart = CartGame.query.filter_by(user_id=user_id).all()

    # Find the cart game matching the game_id
    cart_game_to_remove = None
    for cart_game in cart:
        if cart_game.game_id == game_id:
            cart_game_to_remove = cart_game
            break

    # If the cart game exists, delete it from the database
    if cart_game_to_remove is not None:
        db.session.delete(cart_game_to_remove)
        db.session.commit()

        # Get the updated cart data and return as JSON
        updated_cart = CartGame.query.filter_by(user_id=user_id).all()
        return jsonify([cart_game.to_dict() for cart_game in updated_cart])

    return jsonify({'error': 'Game not found in cart'}), 404




#! -----------  DELETE  -------------- 
# Clears the entire cart of all games

@cart_routes.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    user_id = current_user.id
    cart = CartGame.query.filter_by(user_id=user_id).all()
    for item in cart:
        db.session.delete(item)
    db.session.commit()
    return {'message': 'Cart cleared successfully'}