/**
 * Supabase database types for SAIF STORE.
 *
 * These types mirror supabase/schema.sql (including CHECK constraints, which
 * are expressed as literal unions) so that the typed Supabase client
 * (`createClient<Database>`) can correctly infer Row/Insert/Update shapes.
 *
 * Each table declares a `Relationships` array describing its foreign keys.
 * This is required by the `GenericSchema` / `GenericTable` constraints of
 * `@supabase/postgrest-js` (bundled in `@supabase/supabase-js` v2): without
 * it the client falls back to `never` types for all queries. The parser also
 * uses these relationships to type-check embedded resources
 * (e.g. `products.select('*, categories(*)')`).
 *
 * Foreign keys that reference tables outside the `public` schema
 * (e.g. `*.user_id -> auth.users`) are intentionally omitted, matching the
 * output of `supabase gen types`.
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          address: Record<string, any> | null
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: Record<string, any> | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: Record<string, any> | null
          role?: 'customer' | 'admin'
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          image?: string | null
          sort_order?: number
          is_active?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number
          compare_at_price: number | null
          product_type: 'physical' | 'digital'
          category_id: string | null
          images: string[]
          thumbnail: string | null
          stock: number
          sku: string | null
          status: 'active' | 'draft' | 'archived'
          featured: boolean
          bestseller: boolean
          tags: string[]
          metadata: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          short_description?: string
          price: number
          compare_at_price?: number | null
          product_type?: 'physical' | 'digital'
          category_id?: string | null
          images?: string[]
          thumbnail?: string | null
          stock?: number
          sku?: string | null
          status?: 'active' | 'draft' | 'archived'
          featured?: boolean
          bestseller?: boolean
          tags?: string[]
          metadata?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string
          short_description?: string
          price?: number
          compare_at_price?: number | null
          product_type?: 'physical' | 'digital'
          category_id?: string | null
          images?: string[]
          thumbnail?: string | null
          stock?: number
          sku?: string | null
          status?: 'active' | 'draft' | 'archived'
          featured?: boolean
          bestseller?: boolean
          tags?: string[]
          metadata?: Record<string, any>
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number | null
          stock: number
          size: string | null
          color: string | null
          image: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price?: number | null
          stock?: number
          size?: string | null
          color?: string | null
          image?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          sku?: string | null
          price?: number | null
          stock?: number
          size?: string | null
          color?: string | null
          image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'product_variants_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {}
        Relationships: [
          {
            foreignKeyName: 'wishlists_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      carts: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string | null
          session_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          quantity?: number
          variant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'cart_items_cart_id_fkey'
            columns: ['cart_id']
            isOneToOne: false
            referencedRelation: 'carts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cart_items_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'product_variants'
            referencedColumns: ['id']
          }
        ]
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          status:
            | 'pending'
            | 'confirmed'
            | 'processing'
            | 'ready'
            | 'shipped'
            | 'delivered'
            | 'completed'
            | 'cancelled'
            | 'rejected'
          subtotal: number
          discount: number
          total: number
          coupon_code: string | null
          customer_name: string
          customer_email: string
          customer_phone: string | null
          shipping_address: Record<string, any> | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          status?:
            | 'pending'
            | 'confirmed'
            | 'processing'
            | 'ready'
            | 'shipped'
            | 'delivered'
            | 'completed'
            | 'cancelled'
            | 'rejected'
          subtotal?: number
          discount?: number
          total?: number
          coupon_code?: string | null
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          shipping_address?: Record<string, any> | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?:
            | 'pending'
            | 'confirmed'
            | 'processing'
            | 'ready'
            | 'shipped'
            | 'delivered'
            | 'completed'
            | 'cancelled'
            | 'rejected'
          subtotal?: number
          discount?: number
          total?: number
          coupon_code?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          shipping_address?: Record<string, any> | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          variant_id: string | null
          product_name: string
          variant_name: string | null
          price: number
          quantity: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          variant_id?: string | null
          product_name: string
          variant_name?: string | null
          price: number
          quantity: number
          total: number
          created_at?: string
        }
        Update: {}
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_items_variant_id_fkey'
            columns: ['variant_id']
            isOneToOne: false
            referencedRelation: 'product_variants'
            referencedColumns: ['id']
          }
        ]
      }
      coupons: {
        Row: {
          id: string
          code: string
          type: 'percentage' | 'fixed'
          value: number
          min_order_value: number | null
          max_uses: number | null
          uses_count: number
          expires_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          type: 'percentage' | 'fixed'
          value: number
          min_order_value?: number | null
          max_uses?: number | null
          uses_count?: number
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          code?: string
          type?: 'percentage' | 'fixed'
          value?: number
          min_order_value?: number | null
          max_uses?: number | null
          uses_count?: number
          expires_at?: string | null
          is_active?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string
          body: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          title: string
          body: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          rating?: number
          title?: string
          body?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
      site_settings: {
        Row: {
          id: string
          store_name: string
          store_description: string
          logo_url: string | null
          favicon_url: string | null
          contact_email: string
          contact_phone: string | null
          social_links: Record<string, string>
          announcement: string | null
          maintenance_mode: boolean
          currency: string
          shipping_fee: number
          free_shipping_threshold: number | null
          hero_title: string | null
          hero_subtitle: string | null
          hero_image: string | null
          footer_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_name?: string
          store_description?: string
          logo_url?: string | null
          favicon_url?: string | null
          contact_email?: string
          contact_phone?: string | null
          social_links?: Record<string, string>
          announcement?: string | null
          maintenance_mode?: boolean
          currency?: string
          shipping_fee?: number
          free_shipping_threshold?: number | null
          hero_title?: string | null
          hero_subtitle?: string | null
          hero_image?: string | null
          footer_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          store_name?: string
          store_description?: string
          logo_url?: string | null
          favicon_url?: string | null
          contact_email?: string
          contact_phone?: string | null
          social_links?: Record<string, string>
          announcement?: string | null
          maintenance_mode?: boolean
          currency?: string
          shipping_fee?: number
          free_shipping_threshold?: number | null
          hero_title?: string | null
          hero_subtitle?: string | null
          hero_image?: string | null
          footer_text?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
