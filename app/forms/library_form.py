from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class LibraryGameForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()], render_kw={"placeholder": "Title"}, id="title")
    banner_image = StringField('Banner Image', validators=[DataRequired()], render_kw={"placeholder": "Banner Image URL"}, id="banner_image")
    submit = SubmitField('Save Changes')
    