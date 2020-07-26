FactoryBot.define do
  factory :messages do
    content {Faker::Lorem.sentence}
    image   {"hoge.png"}
    user
    group
  end
end
