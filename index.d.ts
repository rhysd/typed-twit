import { IncomingMessage } from 'http';
import { Promise } from 'es6-promise';
import { Readable } from 'stream';

declare namespace Twit {
  export type StreamEndpoint = 'statuses/filter' | 'statuses/sample' | 'statuses/firehose' | 'user' | 'site';

  export namespace Twitter {
    export type ResultType = 'mixed' | 'popular' | 'recent';

    // See https://dev.twitter.com/overview/api/tweets#obj-contributors
    export interface Contributors {
      id: number,
      id_str: number,
      screen_name: string,
    }

    // See https://dev.twitter.com/overview/api/entities
    export interface HashtagEntity {
      indices: number[],
      text: string,
    }
    export interface Size {
      h: number,
      w: number,
      resize: 'crop' | 'fit',
    }
    export interface Sizes {
      thumb: Size,
      large: Size,
      medium: Size,
      small: Size,
    }
    export interface MediaEntity {
      id: number,
      id_str: string,
      indices: number[],
      url: string,
      display_url: string,
      expanded_url: string,
      media_url: string,
      media_url_https: string,
      sizes: Sizes,
      source_status_id: number,
      source_status_id_str: string,
      type: string,
    }
    export interface UrlEntity {
      url: string,
      display_url: string,
      expanded_url: string,
      indices: number[],
    }
    export interface UserMentionEntity {
      id: number,
      id_str: string,
      indices: number[],
      name: string,
      screen_name: string,
    }
    export interface Entities {
      hashtags: HashtagEntity[],
      media: MediaEntity[],
      urls: UrlEntity[],
      user_mentions: UserMentionEntity[],
    }

    // See https://dev.twitter.com/overview/api/users
    export interface User {
      contributors_enabled: boolean,
      created_at: string,
      default_profile: string,
      default_profile_image: string,
      description: string,
      entities: Entities,
      favourites_count: number,
      follow_request_sent?: boolean,
      following?: boolean,
      followers_count: number,
      friends_count: number,
      geo_enabled?: boolean,
      id: number,
      id_str: string,
      is_translator?: boolean,
      lang: string,
      listed_count: number,
      location: string,
      name: string,
      notifications?: boolean,
      profile_background_color: string,
      profile_background_image_url: string,
      profile_background_image_url_https: string,
      profile_background_tile: boolean,
      profile_banner_url: string,
      profile_image_url: string,
      profile_image_url_https: string,
      profile_link_color: string,
      profile_sidebar_border_color: string,
      profile_sidebar_fill_color: string,
      profile_text_color: string,
      profile_use_background_image: boolean,
      protected: boolean,
      screen_name: string,
      show_all_inline_media: boolean,
      status?: Status,
      statuses_count: number,
      time_zone?: string,
      url: string,
      utc_offset?: number,
      verified: boolean,
      withheld_in_countries: string,
      withheld_scope: string,
    }

    // See https://dev.twitter.com/overview/api/places
    export interface PlaceAttribute {
      street_address: string,
      locality: string,
      region: string,
      iso3: string,
      postal_code: string,
      phone: string,
      twitter: string,
      url: string,
      'app:id': string,
    }
    export interface Place {
      geometry: GeoJSON.Point,
      attributes: PlaceAttribute,
      bounding_box: GeoJSON.Polygon,
      contained_within: Place[],
      country: string,
      country_code: string,
      full_name: string,
      id: string,
      name: string,
      place_type: string,
      url: string,
    }

    // See https://dev.twitter.com/overview/api/tweets
    export interface Status {
      id: number,
      id_str: string,
      annotations?: Object,
      contributors?: Contributors[],
      coordinates?: GeoJSON.Point,
      created_at: string,
      current_user_retweet?: {
        id: number,
        id_str: number,
      },
      entities: Entities,
      favorite_count?: number,
      favorited?: boolean,
      filter_level: 'none' | 'low' | 'medium',
      geo?: Object,
      in_reply_to_screen_name?: string,
      in_reply_to_status_id?: number,
      in_reply_to_status_id_str?: string,
      in_reply_to_user_id?: number,
      in_reply_to_user_id_str?: string,
      lang?: string,
      place?: Place,
      possibly_sensitive?: boolean,
      quoted_status_id?: number,
      quoted_status_id_str?: string,
      quoted_status?: Status,
      scopes?: Object,
      retweet_count: number,
      retweeted: boolean,
      retweeted_status?: Status,
      source?: string,
      text: string,
      truncated: boolean,
      user: User,
      withheld_copyright?: boolean,
      withheld_in_countries?: string[],
      withheld_scope?: string,
    }
    export interface Metadata {
      max_id?: number,
      since_id?: number,
      refresh_url?: string,
      next_results?: string,
      count?: number,
      completed_in?: number,
      since_id_str?: string,
      query?: string,
      max_id_str?: string
    }
  }

  export interface Response {
    statuses: Twitter.Status[],
    search_metadata: Twitter.Metadata,
  }
  interface MediaParam {
    file_path: string
  }
  interface Params {
    // search/tweets
    q?: string,
    geocode?: string,
    lang?: string,
    locale?: string,
    result_type?: Twitter.ResultType,
    count? :number,
    results_per_page?: number,
    until? :string,
    since_id? :string,
    max_id? :string,
    include_entities? :boolean,

    // Other params from various endpoints
    media_id?: string,
    media_ids?: string[],
    alt_text?: {
      text?: string
    },
    media_data?: Buffer | string,
    screen_name?: string,
    id?: string,
    slug?: string,
    status?: string,
  }
  export interface PromiseResponse {
    data: Response | any,
    responde: IncomingMessage,
  }
  export interface Callback {
    ( err: Error, result: Response | any, response: IncomingMessage ): void
  }
  export interface ConfigKeys {
    consumer_key: string,
    consumer_secret: string,
    access_token?: string,
    access_token_secret?: string,
  }
  export interface Options extends ConfigKeys {
    app_only_auth?: boolean,
    timeout_ms?: number,
    trusted_cert_fingerprints?: string[],
  }
}

declare class Twit {
  // See https://github.com/ttezel/twit#var-t--new-twitconfig
  constructor( config: Twit.Options );

  // See https://github.com/ttezel/twit#tgetpath-params-callback
  get( path: string, callback: Twit.Callback );
  get( path: string, params: Twit.Params, callback: Twit.Callback );
  get( path: string, params?: Twit.Params ): Promise<Twit.PromiseResponse>;

  // See https://github.com/ttezel/twit#tpostpath-params-callback
  post( path: string, callback: Twit.Callback );
  post( path: string, params: Twit.Params, callback: Twit.Callback );
  post( path: string, params?: Twit.Params ): Promise<Twit.PromiseResponse>;

  // See https://github.com/ttezel/twit#tpostmediachunkedparams-callback
  postMediaChunked( media: Twit.MediaParam, callback: Twit.Callback );

  // See https://github.com/ttezel/twit#tgetauth
  getAuth(): Twit.Options
  // See https://github.com/ttezel/twit#tsetauthtokens
  setAuth( tokens: Twit.ConfigKeys )

  // See https://github.com/ttezel/twit#tstreampath-params
  stream( path: Twit.StreamEndpoint, params?: Twit.Params ): Readable;
}

export = Twit;
