class CreateInvestments < ActiveRecord::Migration[5.2]
  def change
    create_table :investments do |t|
      t.string :security
      t.numeric :quantity, :precision => 8, :scale => 2
      t.date :purchase_date
      t.numeric :price, :precision => 8, :scale => 2
      t.belongs_to :user
      t.timestamps
    end
  end
end
