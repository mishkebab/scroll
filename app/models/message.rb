# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  content          :text             not null
#  author_id        :bigint           not null
#  messageable_type :string           not null
#  messageable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
  # validates :author_id, uniqueness: { scope: [:messageable_id, :messageable_type]}

  belongs_to :author,
    class_name: 'User',
    foreign_key: 'author_id'
  
  belongs_to :messageable, polymorphic: true
end
