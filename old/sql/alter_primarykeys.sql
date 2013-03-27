ALTER TABLE  `kelpforest`.`competition_interaction_observation` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `competition_interaction_id` , `location_id`, `observation_type` ,  `datum` );

ALTER TABLE  `kelpforest`.`facilitation_interaction_observation` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `facilitation_interaction_id` , `location_id`, `observation_type` ,  `datum` );

ALTER TABLE  `kelpforest`.`trophic_interaction_observation` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `trophic_interaction_id` , `location_id`, `observation_type` ,  `datum` );

ALTER TABLE  `kelpforest`.`node_max_age` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `node_id` ,  `max_age` ,  `datum` );

ALTER TABLE  `kelpforest`.`node_range` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `node_id` , `location_n_id`, `location_s_id` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_reproductive_strategy` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `reproductive_strategy` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_biomass_change` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `biomass_change` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_biomass_density` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `biomass_density` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_consumer_strategy` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `consumer_strategy` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_consum_biomass_ratio` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `consum_biomass_ratio` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_drymass` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `drymass` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_duration` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `duration` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_fecundity` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `fecundity` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_habitat` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `habitat` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_population` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `population` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_length` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `length` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_fecundity` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `fecundity` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_length_weight` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `length_weight` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_lifestyle` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `lifestyle` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_mass` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `mass` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_max_depth` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `max_depth` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_mobility` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `mobility` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_prod_biomass_ratio` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `prod_biomass_ratio` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_prod_consum_ratio` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `prod_consum_ratio` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_residency` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `residency` ,  `datum` );

ALTER TABLE  `kelpforest`.`stage_unassimilated_consum_ratio` DROP PRIMARY KEY ,
ADD PRIMARY KEY (  `cite_id` ,  `stage_id` ,  `unassimilated_consum_ratio` ,  `datum` );



