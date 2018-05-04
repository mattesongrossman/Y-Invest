class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.string :investment_name
      t.numeric :quantity
      t.date :purchase_date
      t.numeric :price
      t.references :user, default: 1, index: true
      t.timestamps
    end
  end
end
