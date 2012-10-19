Siteswapgame::Application.routes.draw do
  resources :scores
  root to: 'home#index'
end
