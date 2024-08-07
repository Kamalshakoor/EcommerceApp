Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
        post 'register', to: 'auth#register'
        post 'login', to: 'auth#login'
        get 'check_session', to: 'auth#check_session'
        delete 'logout', to: 'auth#logout'
        resources :categories
        resources :products do
          collection do
            get 'search', to: 'products#search'
          end
        end        
        resources :line_items, only: [:index, :create, :destroy] do
          member do
            patch :increment
            patch :decrement
          end
        end
        resources :orders, only: [:index, :show, :create,:update, :destroy] do
          resources :ratings, only: [:create]
          collection do
            get 'admin_index', to: 'orders#admin_index'
          end
          member do
            delete 'admin_destroy', to: 'orders#admin_destroy'
             patch 'status_change', to: 'orders#status_change'
          end
        end
    end
  end
end
