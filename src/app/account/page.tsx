import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">My Account</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your profile and view your order history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">Profile</Button>
                <Button variant="secondary" className="justify-start">Order History</Button>
                <Button variant="ghost" className="justify-start">Addresses</Button>
                <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">Log Out</Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold text-primary">Order #KK12345</p>
                    <p className="text-sm text-muted-foreground">Date: {new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Status: Shipped</p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="font-bold">₦129,900</p>
                    <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                  </div>
                </div>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold text-primary">Order #KK12344</p>
                    <p className="text-sm text-muted-foreground">Date: {new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Status: Delivered</p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="font-bold">₦89,900</p>
                    <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                  </div>
                </div>
                <p className="mt-4 text-center text-muted-foreground">No more orders.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
