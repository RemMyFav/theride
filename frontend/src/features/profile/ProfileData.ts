export default interface ProfileData {
    name: String,
    user_id: String,
    rating?: Number,
    num_of_rates?:  Number,
    image?: String,
    //posted questions
    posted_questions?: String[],
    //answered questions
    answered_questions?: String[],
    //previous students
    previous_students?: String[],
    //previous teachers
    previous_teachers?: String[],
  }
  