FoodWebBuilder::Application.routes.draw do
  
  resources :forums


	#For Auto Complete
  	resources :nodes do
  	get :autocomplete_node_working_name, :on => :collection
	end


	#For Node Search
	
	match 'search/' => 'dashboard#search', :as => "search"
	
	
	resources :projects
 

		#Load resources for models
	
	resources :authors
	resources :author_cites
	resources :citations
	resources :competition_interations
	resources :compeition_interaction_observations
	resources :faciliation_interactions
	resources :facilitation_interaction_observations
	resources :functional_groups
	resources :locations
	resources :location_data
	resources :nodes
	resources :node_max_ages
	resources :node_ranges
	resources :non_itis
	resources :parasitic_interactions
	resources :parasitic_interaction_observations
	resources :stages
	resources :stage_biomass_changes
	resources :stage_biomass_densities
	resources :stage_consume_biomass_ratios
	resources :stage_consumer_strategies
	resources :stage_drymasses
	resources :stage_durations
	resources :stage_fecundities
	resources :stage_habitats
	resources :stage_habitat_descriptors
	resources :stage_lengths
	resources :stage_length_fecundities
	resources :stage_length_weights
	resources :stage_lifestyles
	resources :stage_masses
	resources :stage_max_depths
	resources :stage_mobilities
	resources :stage_populations
	resources :stage_prod_biomass_ratios
	resources :stage_prod_consum_ratios
	resources :stage_reproductive_strategies
	resources :stage_residencies
	resources :stage_residency_times
	resources :stage_unassimilated_consum_ratios
	resources :trophic_interactions
	resources :trophic_interaction_observations
	
	# Mount rails admin
	mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'
	
	# Configure routes for authenticated User to dashboard
  authenticated :user do
  	root :to => 'dashboard#index'
  	devise_for :users
  	resources :users
  end
  
  # Default root to home/index.html.erb
  root :to =>"home#index"
  # Overriding the devise registrations controller
	devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  
  # add some matching to make coding easier
  match 'about' => 'home#about'
  match 'help' => 'home#help'
  match 'visualization' => 'visualization#index'
  match 'dataentry' => 'dashboard#dataentry'
	match 'edit_user_path' => 'users_registrations#edit'
	match 'home' => 'home#index'
	match 'dashboard' => 'dashboard#index'
	
end
