class Ability
	include CanCan::Ability

	def initialize(user)
		# Define abilities for the passed in user here. For example:

		user ||= User.new # guest user (not logged in)
		
		# Default abilities
			can :read, :all
			can :show, :all
			cannot [:read, :show] , User
		
		if user.role? :user
			can :read, :all
			can :show, :all
			
			# Should be able to read everything but users
			cannot :read, User
			cannot :show, User
			
			# Author model
			can :create, Author
			can [:update, :edit, :destroy], Author, :user_id => user.id
			
			# Author_cite
			can :create, AuthorCite
			can [:update, :edit, :destroy], AuthorCite, :user_id => user.id
			
			# Citation
			can :create, Citation
			can [:update, :edit, :destroy], Citation, :user_id=>user.id
			
			# Competition_interaction
			can :create, CompetitionInteraction
			can [:update, :edit, :destroy], CompetitionInteraction, :user_id=>user.id
			
			# Competition_interaction_observation
			can :create, CompetitionInteractionObservation
			can [:update, :edit, :destroy], CompetitionInteractionObservation, :user_id => user.id
			
			# Facilitation_Interaction
			can :create, FacilitationInteraction
			can [:update, :edit, :destroy], FacilitationInteraction, :user_id => user.id
			
			# Facilitation_Interaction_Observation
			can :create, FacilitationInteractionObservation
			can [:update, :edit, :destroy], FacilitationInteractionObservation, :user_id => user.id
			
			# User can only read functional_groups 
			
			#User can only read the locations, locations_data tables
			
			# Node
			can :create, Node
			can [:update, :edit, :destroy], Node, :user_id => user.id
			
			# Node_Max_Age
			can :create, NodeMaxAge
			can [:update, :edit, :destroy], NodeMaxAge, :user_id => user.id
			
			# Node_Range
			can :create, NodeRange
			can [:update, :edit, :destroy], NodeRange, :user_id => user.id
			
			# Non_Itis
			can :create, NonIti
			can [:update, :edit, :destroy], NonIti, :user_id => user.id
			
			# Parasitic_Interaction
			can :create, ParasiticInteraction
			can [:edit, :update, :destroy], ParasiticInteraction, :user_id => user.id
			
			# Parasitic_Interaction_Observation
			can :create, ParasiticInteractionObservation
			can [:edit, :update, :destroy], ParasiticInteractionObservation, :user_id => user.id
			
			# Stage
			can :create, Stage
			can [:edit, :update, :destroy], Stage, :user_id => user.id
			
			# Stage_Biomass_Change
			can :create, StageBiomassChange
			can [:edit, :update, :destroy], StageBiomassChange, :user_id => user.id
			
			# Stage_Biomass_Density
			can :create, StageBiomassDensity
			can [:edit, :update, :destroy], StageBiomassDensity, :user_id => user.id
			
			# Stage_Consume_Biomass_Ratio
			can :create, StageConsumeBiomassRatio
			can [:edit, :update, :destroy], StageConsumeBiomassRatio, :user_id => user.id
			
			# Stage_Consumer_Strategy
			can :create, StageConsumerStrategy
			can [:edit, :update, :destroy], StageConsumerStrategy, :user_id => user.id
			
			# Stage_Drymass
			can :create, StageDrymass
			can [:edit, :update, :destroy], StageDrymass, :user_id => user.id
			
			# Stage_Duration
			can :create, StageDuration
			can [:edit, :update, :destroy], StageDuration, :user_id => user.id
			
			# Stage_Fecundity
			can :create, StageFecundity
			can [:edit, :update, :destroy], StageFecundity, :user_id => user.id
			
			# Stage_Habitat
			can :create, StageHabitat
			can [:edit, :update, :destroy], StageHabitat, :user_id => user.id
			
			# Can only read Stage_Habitat_Descriptor
			
			# Stage_Length
			can :create, StageLength
			can [:edit, :update, :destroy], StageLength, :user_id => user.id
			
			# Stage_Length_Fecundity
			can :create, StageLengthFecundity
			can [:edit, :update, :destroy], StageLengthFecundity, :user_id => user.id
			
			# Stage_Length_Weight
			can :create, StageLengthWeight
			can [:edit, :update, :destroy], StageLengthWeight, :user_id => user.id
			
			# Stage_Lifestyle
			can :create, StageLifestyle
			can [:edit, :update, :destroy], StageLifestyle, :user_id => user.id
			
			# Stage_Masses
			can :create, StageMasses
			can [:edit, :update, :destroy], StageMasses, :user_id => user.id
			
			# Stage_Max_Depth
			can :create, StageMaxDepth
			can [:edit, :update, :destroy], StageMaxDepth, :user_id => user.id
			
			# Stage_Mobility
			can :create, StageMobility
			can [:edit, :update, :destroy], StageMobility, :user_id => user.id
			
			# Stage_Populations
			can :create, StagePopulations
			can [:edit, :update, :destroy], StagePopulations, :user_id => user.id
			
			# Stage_Prod_Biomass_Ratio
			can :create, StageProdBiomassRatio
			can [:edit, :update, :destroy], StageProdBiomassRatio, :user_id => user.id
			
			# Stage_Prod_Consum_Ratio
			can :create, StageProdConsumRatio
			can [:edit, :update, :destroy], StageProdConsumRatio, :user_id => user.id
			
			# Stage_Reproductive_Strategy
			can :create, StageReproductiveStrategy
			can [:edit, :update, :destroy], StageReproductiveStrategy, :user_id => user.id
			
			# Stage_Residency
			can :create, StageResidency
			can [:edit, :update, :destroy], StageResidency, :user_id => user.id
			
			# Stage_Residency_Time
			can :create, StageResidencyTime
			can [:edit, :update, :destroy], StageResidencyTime, :user_id => user.id
			
			# Stage_Unassimilated_Consum_Ratio
			can :create, StageUnassimilatedConsumRatio
			can [:edit, :update, :destroy], StageUnassimilatedConsumRatio, :user_id => user.id
			
			cannot :read, Role
			cannot :show, Role
			# Trophic_Interaction
			can :create, TrophicInteraction
			can [:edit, :update, :destroy], TrophicInteraction, :user_id => user.id
			
			# Trophic_Interaction_Observation
			can :create, TrophicInteractionObservation
			can [:edit, :update, :destroy], TrophicInteractionObservation, :user_id => user.id
			
		end
		
		if user.role? :moderator
			
			# Location
			can [:create, :read], Location
			can :manage, Location, :user_id => user.id
			
			# Location_Data
			can [:create, :read], LocationData
			can :manage, LocationData, :user_id => user.id
			
			# Stage_Habitat_Descriptor
			can :create, StageHabitatDescriptor
			can :manage, StageHabitatDescriptor, :user_id => user.id
			can :access, :rails_admin
			can :dashboard
			
		end
		
		if user.role? :admin
			can :manage, :all
			can :access, :rails_admin
			can :dashboard
		end
	end
end
