Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
        post 'register', to: 'auth#register'
        post 'login', to: 'auth#login'
        delete 'logout', to: 'auth#logout'
        resources :categories
        resources :products
        resources :line_items, only: [:create, :destroy] do
          member do
            patch :increment
            patch :decrement
          end
        end
        resources :orders, only: [:index, :show, :create, :update] do
          resources :ratings, only: [:create]
        end
    end
  end

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
