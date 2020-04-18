Rails.application.routes.draw do
  resources :movies
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # namespace :v1, defaults: {format: 'json'} do
    get 'seats', to: 'seats#index'
  # end

  get '*page', to: 'homes#index', constraints: ->(req) do 
    !req.xhr? && req.format.html?
  end
  root 'homes#index'
end
