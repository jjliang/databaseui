class CreateStageBiomassDensities < ActiveRecord::Migration
  def change
    create_table :stage_biomass_densities do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :biomass_density
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
