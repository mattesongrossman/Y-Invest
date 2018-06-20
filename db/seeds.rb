User.destroy_all
Investment.destroy_all

mtg = User.create!(username: "mtg", email: 'mtg@gmail.com', password: 'test')

Investment.create!(user: mtg, security: 'Google', quantity: 10.00, purchase_date: '2018-05-03', price: 1000.00)

puts("Data Created")
