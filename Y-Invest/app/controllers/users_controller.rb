class UsersController < ApplicationController
  #needed
  skip_before_action :verify_authenticity_token
  def index
    @users = User.all
    render json: @users
  end

# POST
def create
  @user = User.new(user_params)
    if @user.save
      render json: {
        message: "Success"
      }
    else
      render json: {
        message: "Error"
      }
    end
end

private
  def user_params
      params.require(:user).permit(:email, :password)
  end

end
