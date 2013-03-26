class CreateFacilitationInteractionObservations < ActiveRecord::Migration
  def change
    create_table :facilitation_interaction_observations do |t|
      t.integer :citation_id
      t.integer :facilitation_interaction_id
      t.integer :location_id
      t.text :comment
      t.integer :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
