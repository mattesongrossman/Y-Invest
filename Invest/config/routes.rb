Rails.application.routes.draw do
  post   "pages/login"       => "sessions#create"
  delete "/logout"      => "sessions#destroy"
  get "/profile"        => "users#profile"
  resources :users, path: "/users"
  resources :investments, path: "/investments"

end
