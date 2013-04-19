class Ability
	include CanCan::Ability

	def initialize(user)
		# Define abilities for the passed in user here. For example:

		user ||= User.new # guest user (not logged in)
		
		# Default abilities
			can :read, :all
			can :show, :all
			cannot [:read, :show] , User
		
		if user.role == "user"
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
			
			# User can only read functional_groups according to project
			can :read, FunctionalGroup, :project_id => user.project_id
			
			#User can only read the locations, locations_data tables according to project
			can :read, Location, :project_id => user.project_id
			
			can :read, LocationDatum, :project_id => user.project_id
			
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
			can :create, StageConsumBiomassRatio
			can [:edit, :update, :destroy], StageConsumBiomassRatio, :user_id => user.id
			
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
			can :create, StageMass
			can [:edit, :update, :destroy], StageMass, :user_id => user.id
			
			# Stage_Max_Depth
			can :create, StageMaxDepth
			can [:edit, :update, :destroy], StageMaxDepth, :user_id => user.id
			
			# Stage_Mobility
			can :create, StageMobility
			can [:edit, :update, :destroy], StageMobility, :user_id => user.id
			
			# Stage_Populations
			can :create, StagePopulation
			can [:edit, :update, :destroy], StagePopulation, :user_id => user.id
			
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
		
		if user.role == "moderator"
			# Author model
			can :create, Author
			can [:update, :edit, :destroy], Author, :project_id => user.project_id, :mod => true
			
			# Author_cite
			can :create, AuthorCite
			can [:update, :edit, :destroy], AuthorCite, :project_id => user.project_id, :mod => true
			
			# Citation
			can :create, Citation
			can [:update, :edit, :destroy], Citation, :project_id => user.project_id, :mod => true
			
			# Competition_interaction
			can :create, CompetitionInteraction
			can [:update, :edit, :destroy], CompetitionInteraction, :project_id => user.project_id, :mod => true
			
			# Competition_interaction_observation
			can :create, CompetitionInteractionObservation
			can [:update, :edit, :destroy], CompetitionInteractionObservation, :project_id => user.project_id, :mod => true
			
			# Facilitation_Interaction
			can :create, FacilitationInteraction
			can [:update, :edit, :destroy], FacilitationInteraction, :project_id => user.project_id, :mod => true
			
			# Facilitation_Interaction_Observation
			can :create, FacilitationInteractionObservation
			can [:update, :edit, :destroy], FacilitationInteractionObservation, :project_id => user.project_id, :mod => true
			
			# functional_groups 
			can :create, FunctionalGroup
			can [:edit, :update, :destroy], FunctionalGroup, :project_id => user.project_id, :mod => true
			
			# Location
			can [:create, :read], Location
			can :manage, Location, :project_id => user.project_id, :mod => true
			
			# Location_Data
			can [:create, :read], LocationDatum
			can :manage, LocationDatum, :project_id => user.project_id, :mod => true
			
			# Node
			can :create, Node
			can [:update, :edit, :destroy], Node, :project_id => user.project_id, :mod => true
			
			# Node_Max_Age
			can :create, NodeMaxAge
			can [:update, :edit, :destroy], NodeMaxAge, :project_id => user.project_id, :mod => true
			
			# Node_Range
			can :create, NodeRange
			can [:update, :edit, :destroy], NodeRange, :project_id => user.project_id, :mod => true
			
			# Non_Itis
			can :create, NonIti
			can [:update, :edit, :destroy], NonIti, :project_id => user.project_id, :mod => true
			
			# Parasitic_Interaction
			can :create, ParasiticInteraction
			can [:edit, :update, :destroy], ParasiticInteraction, :project_id => user.project_id, :mod => true
			
			# Parasitic_Interaction_Observation
			can :create, ParasiticInteractionObservation
			can [:edit, :update, :destroy], ParasiticInteractionObservation, :project_id => user.project_id, :mod => true
			
			# Stage
			can :create, Stage
			can [:edit, :update, :destroy], Stage, :project_id => user.project_id, :mod => true
			
			# Stage_Biomass_Change
			can :create, StageBiomassChange
			can [:edit, :update, :destroy], StageBiomassChange,:project_id => user.project_id, :mod => true
			
			# Stage_Biomass_Density
			can :create, StageBiomassDensity
			can [:edit, :update, :destroy], StageBiomassDensity, :project_id => user.project_id, :mod => true
			
			# Stage_Consume_Biomass_Ratio
			can :create, StageConsumBiomassRatio
			can [:edit, :update, :destroy], StageConsumBiomassRatio, :project_id => user.project_id, :mod => true
			
			# Stage_Consumer_Strategy
			can :create, StageConsumerStrategy
			can [:edit, :update, :destroy], StageConsumerStrategy, :project_id => user.project_id, :mod => true
			
			# Stage_Drymass
			can :create, StageDrymass
			can [:edit, :update, :destroy], StageDrymass, :project_id => user.project_id, :mod => true
			
			# Stage_Duration
			can :create, StageDuration
			can [:edit, :update, :destroy], StageDuration, :project_id => user.project_id, :mod => true
			
			# Stage_Fecundity
			can :create, StageFecundity
			can [:edit, :update, :destroy], StageFecundity, :project_id => user.project_id, :mod => true
			
			# Stage_Habitat
			can :create, StageHabitat
			can [:edit, :update, :destroy], StageHabitat, :project_id => user.project_id, :mod => true
			
			# Stage_Habitat_Descriptor
			can :create, StageHabitatDescriptor
			can [:edit, :update, :destroy], StageHabitatDescriptor, :project_id => user.project_id, :mod => true
			
			# Stage_Length
			can :create, StageLength
			can [:edit, :update, :destroy], StageLength, :project_id => user.project_id, :mod => true
			
			# Stage_Length_Fecundity
			can :create, StageLengthFecundity
			can [:edit, :update, :destroy], StageLengthFecundity, :project_id => user.project_id, :mod => true
			
			# Stage_Length_Weight
			can :create, StageLengthWeight
			can [:edit, :update, :destroy], StageLengthWeight, :project_id => user.project_id, :mod => true
			
			# Stage_Lifestyle
			can :create, StageLifestyle
			can [:edit, :update, :destroy], StageLifestyle, :project_id => user.project_id, :mod => true
			
			# Stage_Masses
			can :create, StageMass
			can [:edit, :update, :destroy], StageMass, :project_id => user.project_id, :mod => true
			
			# Stage_Max_Depth
			can :create, StageMaxDepth
			can [:edit, :update, :destroy], StageMaxDepth, :project_id => user.project_id, :mod => true
			
			# Stage_Mobility
			can :create, StageMobility
			can [:edit, :update, :destroy], StageMobility, :project_id => user.project_id, :mod => true
			
			# Stage_Populations
			can :create, StagePopulation
			can [:edit, :update, :destroy], StagePopulation, :project_id => user.project_id, :mod => true
			
			# Stage_Prod_Biomass_Ratio
			can :create, StageProdBiomassRatio
			can [:edit, :update, :destroy], StageProdBiomassRatio, :project_id => user.project_id, :mod => true
			
			# Stage_Prod_Consum_Ratio
			can :create, StageProdConsumRatio
			can [:edit, :update, :destroy], StageProdConsumRatio, :project_id => user.project_id, :mod => true
			
			# Stage_Reproductive_Strategy
			can :create, StageReproductiveStrategy
			can [:edit, :update, :destroy], StageReproductiveStrategy, :project_id => user.project_id, :mod => true
			
			# Stage_Residency
			can :create, StageResidency
			can [:edit, :update, :destroy], StageResidency, :project_id => user.project_id, :mod => true
			
			# Stage_Residency_Time
			can :create, StageResidencyTime
			can [:edit, :update, :destroy], StageResidencyTime,:project_id => user.project_id, :mod => true
			
			# Stage_Unassimilated_Consum_Ratio
			can :create, StageUnassimilatedConsumRatio
			can [:edit, :update, :destroy], StageUnassimilatedConsumRatio, :project_id => user.project_id, :mod => true
			
			# Moderators cannot do anything for roles
			cannot [:read, :edit, :update, :destroy, :create], Role
			
			# Trophic_Interaction
			can :create, TrophicInteraction
			can [:edit, :update, :destroy], TrophicInteraction, :project_id => user.project_id, :mod => true
			
			# Trophic_Interaction_Observation
			can :create, TrophicInteractionObservation
			can [:edit, :update, :destroy], TrophicInteractionObservation, :project_id => user.project_id, :mod => true
			
			#Mod can approve users
			can [:edit,:update], User, :project_id => user.project_id
			
			can :access, :rails_admin
			can :dashboard
			
		end
		
		if user.role == "lead"
			can :create, :all
			# Author model
			can :manage, Author, :project_id => user.project_id
			
			# Author_cite
			can :manage, AuthorCite, :project_id => user.project_id
			
			# Citation
			can :manage, Citation, :project_id => user.project_id
			
			# Competition_interaction
			can :manage, CompetitionInteraction, :project_id => user.project_id
			
			# Competition_interaction_observation
			can :manage, CompetitionInteractionObservation, :project_id => user.project_id
			
			# Facilitation_Interaction
			can :manage, FacilitationInteraction, :project_id => user.project_id
			
			# Facilitation_Interaction_Observation
			can :manage, FacilitationInteractionObservation, :project_id => user.project_id
			
			# functional_groups 
			can :create, FunctionalGroup
			can [:manage], FunctionalGroup, :project_id => user.project_id
			
			# Location
			can :manage, Location, :project_id => user.project_id
			
			# Location_Data
			can :manage, LocationDatum, :project_id => user.project_id
			
			# Node
			can [:manage], Node, :project_id => user.project_id
			
			# Node_Max_Age
			can :manage, NodeMaxAge, :project_id => user.project_id
			
			# Node_Range
			can :manage, NodeRange, :project_id => user.project_id
			
			# Non_Itis
			can :manage, NonIti, :project_id => user.project_id
			
			# Parasitic_Interaction
			can :manage, ParasiticInteraction, :project_id => user.project_id
			
			# Parasitic_Interaction_Observation
			can :manage, ParasiticInteractionObservation, :project_id => user.project_id
			
			# Stage
			can :manage, Stage, :project_id => user.project_id
			
			# Stage_Biomass_Change
			can :manage, StageBiomassChange,:project_id => user.project_id
			
			# Stage_Biomass_Density
			can :manage, StageBiomassDensity, :project_id => user.project_id
			
			# Stage_Consume_Biomass_Ratio
			can :manage, StageConsumBiomassRatio, :project_id => user.project_id
			
			# Stage_Consumer_Strategy

			can :manage, StageConsumerStrategy, :project_id => user.project_id
			
			# Stage_Drymass

			can :manage, StageDrymass, :project_id => user.project_id
			
			# Stage_Duration
			can :manage, StageDuration, :project_id => user.project_id
			
			# Stage_Fecundity
			can :manage, StageFecundity, :project_id => user.project_id
			
			# Stage_Habitat
			can :manage, StageHabitat, :project_id => user.project_id, :mod => true
			
			# Stage_Habitat_Descriptor
			can :manage, StageHabitatDescriptor, :project_id => user.project_id
			
			# Stage_Length
			can :manage, StageLength, :project_id => user.project_id
			
			# Stage_Length_Fecundity
			can :manage, StageLengthFecundity, :project_id => user.project_id
			
			# Stage_Length_Weight
			can :manage, StageLengthWeight, :project_id => user.project_id
			
			# Stage_Lifestyle
			can :manage, StageLifestyle, :project_id => user.project_id
			
			# Stage_Masses
			can :manage, StageMass, :project_id => user.project_id
			
			# Stage_Max_Depth
			can :manage, StageMaxDepth, :project_id => user.project_id
			
			# Stage_Mobility
			can :manage, StageMobility, :project_id => user.project_id
			
			# Stage_Populations
			can :manage, StagePopulation, :project_id => user.project_id
			
			# Stage_Prod_Biomass_Ratio
			can :manage, StageProdBiomassRatio, :project_id => user.project_id
			
			# Stage_Prod_Consum_Ratio
			can :manage, StageProdConsumRatio, :project_id => user.project_id
			
			# Stage_Reproductive_Strategy
			can :manage, StageReproductiveStrategy, :project_id => user.project_id
			
			# Stage_Residency
			can :manage, StageResidency, :project_id => user.project_id
			
			# Stage_Residency_Time
			can :manage, StageResidencyTime,:project_id => user.project_id
			
			# Stage_Unassimilated_Consum_Ratio
			can :manage, StageUnassimilatedConsumRatio, :project_id => user.project_id
			
			# Lead only assign roles moderator and user we might not be using roles table
			cannot [:edit, :update, :destroy, :create], Role
			
			# Trophic_Interaction
			can :manage, TrophicInteraction, :project_id => user.project_id
			
			# Trophic_Interaction_Observation
			can :manage, TrophicInteractionObservation, :project_id => user.project_id
			
			# Lead can approve users
			can [:edit,:update], User, :project_id => user.project_id
			
			can :access, :rails_admin
			can :dashboard

		end
		
		if user.role == 'admin'
			can :create, :all
			can :manage, :all
			can :access, :rails_admin
			can :dashboard
		end
	end
end
