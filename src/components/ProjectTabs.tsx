import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectTabs() {
  return (
    <Tabs defaultValue="works" className="w-100">
      <TabsList>
        <TabsTrigger value="works">All Works</TabsTrigger>
        <TabsTrigger value="commercial">Commercial</TabsTrigger>
        <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        <TabsTrigger value="residential">Residential</TabsTrigger>
        <TabsTrigger value="industrial">Industrial</TabsTrigger>
      </TabsList>
      <TabsContent value="works">
        <Card>
          <CardHeader>
            <CardTitle>All Works</CardTitle>
            <CardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="commercial">
        <Card>
          <CardHeader>
            <CardTitle>Commercial</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="infrastructure">
        <Card>
          <CardHeader>
            <CardTitle>Infrastructure</CardTitle>
            <CardDescription>
              Generate and download your detailed infrastructure. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 5 infrastructure ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="residential">
        <Card>
          <CardHeader>
            <CardTitle>Residential</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="industrial">
        <Card>
          <CardHeader>
            <CardTitle>Industrial</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
