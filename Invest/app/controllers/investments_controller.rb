class InvestmentsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    investment = Investment.all
    render json: { investment: investment }
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

  private
  def investment_params
    params.require(:investment).permit(:security, :quantity, :purchase_date, :price)
  end

end
