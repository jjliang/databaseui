class CreateCompetitionInteractionObservations < ActiveRecord::Migration
  def change
    create_table :competition_interaction_observations do |t|
      t.integer :citation_id
      t.integer :comptetition_interaction_id
      t.integer :location_id
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
