class InvestmentsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    user = User.find_by_auth_token!(request.headers[:token])
    user_investments = Investment.where(user_id: user.id)
    render json: {
      user: { username: user.username, email: user.email, name: user.name },
      investments: user_investments,
    }
  end

  def show
    investment = Investment.find(params[:id])
    investment_user = investment.user
    render json: { investment: investment }
  end

  def create
    investment = Investment.new(investment_params)
    investment.user = current_user

    if investment.save
      render json: {
      message: 'ok',
      investment: investment,
    }
    else
      render json: { message: "Couldn't create investment"}
    end
  end

  def destroy
    user = User.find_by_auth_token!(request.headers[:token])
    Investment.destroy(params[:id])
  end


  private
  def investment_params
    params.require(:investment).permit(:security, :quantity, :purchase_date, :price)
  end

end
