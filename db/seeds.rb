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
        display_name: 'Professor Dumbledore',
        title: 'Headmaster of Hogwarts',
        email: 'dumbledore@hogwarts.edu', 
        password: 'password'
    )

    User.create!(
        display_name: 'Professor Snape',
        title: 'Professor of Potions',
        email: 'snape@hogwarts.edu', 
        password: 'password'
    )

    User.create!(
        display_name: 'Luna Lovegood',
        title: 'Student',
        email: 'luna@hogwarts.edu', 
        password: 'password'
    )

    User.create!(
        display_name: 'Cho Chang',
        title: 'Student',
        email: 'cho@hogwarts.edu', 
        password: 'password'
    )

    User.create!(
        display_name: 'Harry Potter',
        title: 'Student',
        email: 'potter@hogwarts.edu', 
        password: 'password'
    )

    User.create!(
        display_name: 'Ron Weasley',
        title: 'Student',
        email: 'ron@hogwarts.edu', 
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

    puts "Creating workspace subscriptions..."

    WorkspaceSubscription.create!(
        user_id: 1,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 1,
        workspace_id: 2
    )

    WorkspaceSubscription.create!(
        user_id: 2,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 3,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 4,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 5,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 6,
        workspace_id: 1
    )

    WorkspaceSubscription.create!(
        user_id: 7,
        workspace_id: 1
    )

    puts "Creating channels..."

    Channel.create!(
        name: 'general',
        owner_id: 2,
        workspace_id: 1,
        description: "Welcome to Hogwarts School of Witchcraft and Wizardry!"
    )

    Channel.create!(
        name: 'gryffindor',
        owner_id: 2,
        workspace_id: 1,
        description: "Courage, Chivalry, and Determination"
    )

    Channel.create!(
        name: 'slytherin',
        owner_id: 3,
        workspace_id: 1,
        description: "Ambition, Cunning, and Resourcefulness"
    )

    Channel.create!(
        name: 'kings Cross Station',
        owner_id: 1,
        workspace_id: 2,
        description: "To discuss the weird disappearances are happening here..."
    )

    Channel.create!(
        name: 'ravenclaw',
        owner_id: 4,
        workspace_id: 1,
        description: "Wisdom, Wit, and Intellect"
    )

    Channel.create!(
        name: 'hufflepuff',
        owner_id: 5,
        workspace_id: 1,
        description: "Hard Work, Kindness, and Patience"
    )



    puts "Creating channel subscriptions..."

    ChannelSubscription.create!(
        user_id: 1,
        channel_id: 1
    )

    ChannelSubscription.create!(
        user_id: 2,
        channel_id: 1
    )

    ChannelSubscription.create!(
        user_id: 3,
        channel_id: 1
    )

    ChannelSubscription.create!(
        user_id: 4,
        channel_id: 1
    )

    ChannelSubscription.create!(
        user_id: 5,
        channel_id: 1
    )

    ChannelSubscription.create!(
        user_id: 1,
        channel_id:2
    )

    ChannelSubscription.create!(
        user_id: 1,
        channel_id:4
    )

    ChannelSubscription.create!(
        user_id: 2,
        channel_id: 2
    )

    ChannelSubscription.create!(
        user_id: 3,
        channel_id: 3
    )

    ChannelSubscription.create!(
        user_id: 4,
        channel_id: 5
    )

    ChannelSubscription.create!(
        user_id: 5,
        channel_id: 5
    )

    puts "Creating DM Conversations..."

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    DirectMessage.create!(
        workspace_id: 1
    )

    puts "Creating DM Conversation Subscriptions..."

    DirectMessageSubscription.create!(
        direct_message_id: 1,
        user_id: 1
    )

    DirectMessageSubscription.create!(
        direct_message_id: 1,
        user_id: 2
    )

    DirectMessageSubscription.create!(
        direct_message_id: 2,
        user_id: 1
    )

    DirectMessageSubscription.create!(
        direct_message_id: 2,
        user_id: 4
    )

    DirectMessageSubscription.create!(
        direct_message_id: 2,
        user_id: 5
    )

    DirectMessageSubscription.create!(
        direct_message_id: 4,
        user_id: 1
    )

    DirectMessageSubscription.create!(
        direct_message_id: 4,
        user_id: 3
    )

    DirectMessageSubscription.create!(
        direct_message_id: 5,
        user_id: 1
    )

    DirectMessageSubscription.create!(
        direct_message_id: 5,
        user_id: 6
    )

    DirectMessageSubscription.create!(
        direct_message_id: 6,
        user_id: 1
    )

    DirectMessageSubscription.create!(
        direct_message_id: 6,
        user_id: 7
    )

    DirectMessageSubscription.create!(
        direct_message_id: 7,
        user_id: 2
    )

    DirectMessageSubscription.create!(
        direct_message_id: 7,
        user_id: 3
    )

    DirectMessageSubscription.create!(
        direct_message_id: 8,
        user_id: 2
    )

    DirectMessageSubscription.create!(
        direct_message_id: 8,
        user_id: 5
    )


    puts "Creating messages..."

    Message.create!(
        content: 'yo this is Snape',
        author_id: 3,
        messageable_type: "Channel",
        messageable_id: 2
    )

    Message.create!(
        content: 'yo this is Hermione',
        author_id: 1,
        messageable_type: "Channel",
        messageable_id: 1
    )

    Message.create!(
        content: 'hi H - this is dumbledore',
        author_id: 2,
        messageable_type: "Channel",
        messageable_id: 1
    )

    Message.create!(
        content: 'hello Hermione we need the Time-Turner back',
        author_id: 2,
        messageable_type: "DirectMessage",
        messageable_id: 1
    )

    Message.create!(
        content: 'will return ASAP!',
        author_id: 1,
        messageable_type: "DirectMessage",
        messageable_id: 1
    )

    Message.create!(
        content: 'will return ASAP!',
        author_id: 1,
        messageable_type: "DirectMessage",
        messageable_id: 1
    )

    puts "Done!"
end