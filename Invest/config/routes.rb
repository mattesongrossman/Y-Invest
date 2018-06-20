Rails.application.routes.draw do
  get 'catch_all/index'
  post   "pages/login"       => "sessions#create"
  delete "/pages/logout"      => "sessions#destroy"
  get "/profile"        => "users#profile"
  resources :users, path: "/users"
  resources :investments, path: "/investments"
  get '*path', to: 'catch_all#index'

end
