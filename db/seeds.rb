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
    Message.destroy_all
    DirectMessageSubscription.destroy_all
    ChannelSubscription.destroy_all
    DirectMessage.destroy_all
    Channel.destroy_all
    WorkspaceSubscription.destroy_all
    Workspace.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('direct_message_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('direct_messages')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
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
        content: 'Hi all! Welcome to a new school year at Hogwarts!',
        author_id: 2,
        messageable_type: "Channel",
        messageable_id: 1
    )

    Message.create!(
        content: 'I can teach you how to bottle fame, brew glory, even stopper death...',
        author_id: 3,
        messageable_type: "Channel",
        messageable_id: 1
    )

    Message.create!(
        content: "What should we do if we've already finished all our coursework for this semester?",
        author_id: 1,
        messageable_type: "Channel",
        messageable_id: 1
    )

    Message.create!(
        content: "Anyone down for a game of chess in the common room tonight?",
        author_id: 7,
        messageable_type: "Channel",
        messageable_id: 2
    )

    Message.create!(
        content: "I would but Professor Umbridge gave me detention again...",
        author_id: 6,
        messageable_type: "Channel",
        messageable_id: 2
    )

    Message.create!(
        content: 'Hermione - please come to my office ASAP to discuss your advanced course load',
        author_id: 2,
        messageable_type: "DirectMessage",
        messageable_id: 1
    )

    Message.create!(
        content: 'OK will do Professor!',
        author_id: 1,
        messageable_type: "DirectMessage",
        messageable_id: 1
    )

    puts "Done!"
end