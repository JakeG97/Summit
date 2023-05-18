from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class GameForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    image = StringField('Image URL', validators=[DataRequired()])
    price = StringField('Price', validators=[DataRequired()])
    release_date = StringField('Release Date', validators=[DataRequired()])
    short_description = StringField('Short Description', validators=[DataRequired()])
    full_description = StringField('Full Description', validators=[DataRequired()])
    developer = StringField('Developer', validators=[DataRequired()])
    publisher = StringField('Publisher', validators=[DataRequired()])
    banner_image = StringField('Banner Image URL')
    other_images = StringField('Other Images')
