Rails.application.routes.draw do
  post   "/api/login"       => "sessions#create"
  delete "/api/logout"      => "sessions#destroy"
  get "/api/profile"        => "users#profile"
  resources :users, path: "/api/users"
  resources :investments, path: "/api/investments"

end
