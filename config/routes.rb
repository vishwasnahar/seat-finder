Rails.application.routes.draw do
  resources :movies
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'seats', to: 'seats#index'
  
  get '*page', to: 'homes#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root 'homes#index'
end
