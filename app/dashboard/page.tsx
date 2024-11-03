"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Settings, CreditCard } from "lucide-react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

interface Book {
  id: string
  title: string
  createdAt: Date
  status: "draft" | "completed"
  coverUrl: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchBooks() {
      if (!user) return
      
      const q = query(
        collection(db, "books"),
        where("userId", "==", user.uid)
      )
      
      const querySnapshot = await getDocs(q)
      const fetchedBooks: Book[] = []
      
      querySnapshot.forEach((doc) => {
        fetchedBooks.push({ id: doc.id, ...doc.data() } as Book)
      })
      
      setBooks(fetchedBooks)
    }

    fetchBooks()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your books and account settings
          </p>
        </div>
        <Button asChild>
          <Link href="/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Book
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="books">My Books</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Books
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{books.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscription Status
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Settings
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/settings">Manage Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Books</CardTitle>
              <CardDescription>
                Your recently created or modified books
              </CardDescription>
            </CardHeader>
            <CardContent>
              {books.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {books.slice(0, 3).map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="block group"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 p-4">
                          <h3 className="text-white font-semibold">{book.title}</h3>
                          <p className="text-white/80 text-sm">
                            {book.status === "completed" ? "Completed" : "Draft"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No books yet</h3>
                  <p className="text-muted-foreground">
                    Create your first magical story
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Book
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle>My Books</CardTitle>
              <CardDescription>
                All your created books and drafts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {books.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-4">
                  {books.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="block group"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 p-4">
                          <h3 className="text-white font-semibold">{book.title}</h3>
                          <p className="text-white/80 text-sm">
                            {book.status === "completed" ? "Completed" : "Draft"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No books yet</h3>
                  <p className="text-muted-foreground">
                    Create your first magical story
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Book
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Current Plan</h3>
                    <p className="text-muted-foreground">Premium Monthly</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Billing Information</h3>
                    <p className="text-muted-foreground">
                      Next billing date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline">Update Billing</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Payment History</h3>
                    <p className="text-muted-foreground">View your past invoices</p>
                  </div>
                  <Button variant="outline">View History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}