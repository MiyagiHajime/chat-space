Rails.application.routes.draw do
  devise_for :users
  # root "messages#index"
  root "message#index"
  resources :users, only: [:edit, :update]
end
