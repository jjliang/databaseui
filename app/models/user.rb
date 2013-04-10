class User < ActiveRecord::Base
  rolify
  # admin = super user, moderator = scientist user = data entry
  ROLES = %w[user moderator lead admin]

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  # Setup accessible (or protected) attributes for your model
  
  # This is for login with username or e-mail
  attr_accessor :login
  

 
   attr_accessible :email, :password, :password_confirmation, :remember_me , :role , :approved , :username, :firstname, :lastname, :project_id
  # attr_accessible :title, :body
  has_many :authors
  has_many :author_cites
  has_many :citations
  has_many :competition_interactions
  has_many :competition_interaction_observations
  has_many :facilitation_interactions
  has_many :facilitation_interaction_observations
  has_many :nodes
  has_many :node_max_ages
  has_many :node_ranges
  has_many :non_itis
  has_many :parasitic_interactions
  has_many :parasitic_interaction_observations
  has_many :stages
  has_many :stage_biomass_changes
  has_many :stage_biomass_densities
  has_many :stage_consum_biomass_ratios
  has_many :stage_consumer_strategies
  has_many :stage_drymasses
  has_many :stage_durations
  has_many :stage_fecundities
  has_many :stage_habitats
  has_many :stage_habitat_descriptors
  has_many :stage_lengths
  has_many :stage_length_fecundities
  has_many :stage_length_weights
  has_many :stage_lifestyles
  has_many :stage_masses
  has_many :stage_max_depths
  has_many :stage_mobilities
  has_many :stage_populations
  has_many :stage_prod_biomass_ratios
  has_many :stage_prod_consum_ratios
  has_many :stage_reproductive_strategies
  has_many :stage_residencies
  has_many :stage_residency_times
  has_many :stage_unassimilated_consum_ratios
  has_many :trophic_interactions
  has_many :trophic_interaction_observations

  # This is for admin approval of user accounts
  def active_for_authentication? 
  	super && approved?
  	
	end 
	
	def inactive_message 
  	if !approved?
  	  :inactive
  	else 
    	super
  	end 
	end
	
	# For listing users
	def index
 	 if params[:approved] == "false"
  	  @users = User.find_all_by_approved(false)
  	else
  	  @users = User.all
  	end
	end
	
	# Need to override the find for authentication method
	def self.find_first_by_auth_conditions(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      else
        where(conditions).first
      end
    end
end
