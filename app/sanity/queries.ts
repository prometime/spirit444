import groq from 'groq'

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle }`

export const RECORDS_QUERY = groq`*[_type == "record"][0...12]|order(title asc){
    _id,
    _type,
    title,
    releaseDate,
    "slug": slug.current,
    "artist": artist->name,
    image
  } | order(releaseDate desc)`

export const RECORD_QUERY = groq`*[_type == "record" && slug.current == $slug][0]{
  ...,
  _id,
  title,
  releaseDate,
  "slug": slug.current,
  "artist": artist->name,
  "likes": coalesce(likes, 0),
  "dislikes": coalesce(dislikes, 0),
  image,
  content,
  tracks[]{
    _key,
    title,
    duration
  }
}`

export const TRACK_QUERY = groq`*[_type == "track" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "artist": artist->name,
  duration,
  lyrics
}`