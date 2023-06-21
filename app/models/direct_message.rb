# == Schema Information
#
# Table name: direct_messages
#
#  id           :bigint           not null, primary key
#  workspace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class DirectMessage < ApplicationRecord
  belongs_to :workspace
  has_many :user_direct_messages
end
