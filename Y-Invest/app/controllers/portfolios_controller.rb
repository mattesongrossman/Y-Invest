class PortfoliosController < ApplicationController
  #needed
  skip_before_action :verify_authenticity_token
  def index
    @portfolios = Portfolio.all
    render json: @portfolios
  end

# POST
def create
  @portfolio = Portfolio.new(portfolio_params)
    if @portfolio.save
      render json: {
        message: "Success"
      }
    else
      render json: {
        message: "Error"
      }
    end
end

def edit
  @portfolio= Portfolio.find(params[:id])
end

def update
  @portfolio = Portfolio.find(params[:id])
   if @portfolio.update(portfolio_params)
     render json: {
       message: "Success"
     }
   else
     render json: {
       message: "Error"
     }
   end
 end

def destroy
  @portfolio = Portfolio.find(params[:id])
  @portfolio.destroy

end


private
  def portfolio_params
      params.require(:portfolio).permit(:investment_name, :quantity, :purchase_date, :price)
  end
end
