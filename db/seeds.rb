# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')

  
    puts "Creating users..."

    User.create!(
      display_name: 'Hermione',
      title: 'Student',
      email: 'hermione@hogwarts.edu', 
      password: 'password'
    )

    User.create!(
        display_name: 'Dumbledore',
        title: 'Headmaster of Hogwarts',
        email: 'dumbledore@hogwarts.edu', 
        password: 'password'
    )

    puts "Creating workspaces..."


    Workspace.create!(
        name: 'Hogwarts', 
        owner_id: 2
    )

    Workspace.create!(
        name: 'Muggle World', 
        owner_id: 1
    )

    User.create!(
        display_name: 'Snape',
        title: 'Professor of Potions',
        email: 'snape@hogwarts.edu', 
        password: 'password'
    )


    puts "Creating channels..."

    Channel.create!(
        name: 'Gryffindor',
        owner_id: 2,
        workspace_id: 1,
        description: "Courage, Chivalry, and Determination"
    )

    Channel.create!(
        name: 'Slytherin',
        owner_id: 3,
        workspace_id: 1,
        description: "Ambition, Cunning, and Resourcefulness"
    )

    Channel.create!(
        name: 'Kings Cross Station',
        owner_id: 1,
        workspace_id: 2,
        description: "To discuss the weird disappearances are happening here..."
    )


    puts "Done!"
end