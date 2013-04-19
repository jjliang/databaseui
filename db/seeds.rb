# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(:firstname => 'Admin', :lastname => 'Tester', :username => 'admin', :email => 'admin@foodwebbuilder.com', :password => '12345678', :role => 'admin', :approved => 1, :project_id =>1)

User.create(:firstname => 'Moderator', :lastname => 'Tester', :username => 'moderator', :email => 'mod@foodwebbuilder.com', :password => '12345678', :role => 'moderator', :approved => 1, :project_id =>1)

User.create(:firstname => 'User', :lastname => 'Tester', :username => 'user', :email => 'user@foodwebbuilder.com', :password => '12345678', :role => 'user', :approved => 1, :project_id =>1)

User.create(:firstname => 'Project', :lastname => 'Lead', :username => 'lead', :email => 'lead@foodwebbuilder.com', :password => '12345678', :role => 'lead', :approved => 1, :project_id =>1)

User.create(:firstname => 'Kevin', :lastname => "O'Brien", :username => 'KB', :email => 'kb@foodwebbuilder.com', :password => '12345678', :role => 'admin', :approved => 0, :project_id =>1)


Project.create(:name => 'New Project', :public => 1, :creator => 1, :user_id => 1, :approved => 1)
Project.create(:name => 'Testing', :public => 1, :creator => 1, :user_id => 1, :approved => 1)



User.create(:firstname => 'Kevin', :lastname => "O'Brien", :username => 'KB', :email => 'kb@foodwebbuilder.com', :password => '12345678', :role => 'admin', :approved => 0, :project_id =>1)


LocationDatum.create(latitude: [42.31276,42.35653,42.45453],longitude: [-
 71.03645,-71.06754,-71.7856],location_id: 1,name: "UMASS BOSTON",user_id: 2,project_id: 1,mod: 1,approved: 1)


LocationDatum.create(latitude: [41.31276,44.35653,41.25453,45.52244],longitude: [-
 72.03645,-72.06754,-74.7856,-72.14232],location_id: 2,name: "Amazon",user_id: 2,project_id: 1,mod: 1,approved: 1)

 LocationDatum.create(latitude: [21.31276,22.35653,20.25453],longitude: [-
 72.03645,-72.06754,-74.7856],location_id: 2,name: "Test Region",user_id: 2,project_id: 2,mod: 1,approved: 1)

