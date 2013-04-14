RailsAdmin.config do |config|
  config.authorize_with :cancan
  config.excluded_models = ["Role"]
  
  config.model 'User' do
  	list do
  		field :firstname
  		field :lastname
  		field :username
  		field :email
  		field :role do
  			visible :false
  			end
  		field :sign_in_count
  		field :last_sign_in_at
  	end
  	
  	edit do
  		field :firstname
  		field :lastname
  		field :username
  		field :email
  		field :approved
        field :project_id
  	end
  end
end
