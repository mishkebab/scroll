Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  mount ActionCable.server => '/cable'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resource :session, only: [:create, :show, :destroy]
    resources :workspaces, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index, :show, :create, :update]
      resources :dms, only: [:index, :show, :create, :update]
    end 
    resources :messages, only: [:index, :show, :create, :update, :destroy]
    resources :channel_subscriptions, only: [:create, :destroy]
  end

  get '*path', to: 'static_pages#frontend'
end
