# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

 users = User.create(:email => 'foodwebbuilder@gmail.com', :password => '12345678', :password_confirmation => '12345678', :role => 'admin', :approved => 1)



City.create(name: "New york" ,state: "NY", population: 8175133)
City.create(name: "Los Angeles",state: "CA", population: 3792621 )
City.create(name: "Chicago",state: "IL", population: 2695598)
City.create(name: "Houston",state: "TX", population: 2099451)
City.create(name: "Philadelphia",state: "PA" , population: 1526006)
City.create(name: "Phoenix",state: "AZ", population: 1445632)
City.create(name: "San Antonio",state: "TX", population: 1327407)
City.create(name: "San Diego",state: "CA", population: 1307402 )
City.create(name: "Dallas",state: "TX", population: 1197816)
City.create(name: "San Jose",state: "CA", population: 945942)