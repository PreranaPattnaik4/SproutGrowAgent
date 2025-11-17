import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Welcome to SproutGrow Agent&apos;s Privacy Policy. This page informs you of
            our policies regarding the collection, use, and disclosure of personal
            data when you use our Service and the choices you have associated
            with that data.
          </p>

          <h3 className="font-headline">Information Collection and Use</h3>
          <p>
            We collect several different types of information for various
            purposes to provide and improve our Service to you. This may include,
            but is not limited to, usage data and personal identification
            information.
          </p>

          <h3 className="font-headline">Log Data</h3>
          <p>
            We may also collect information that your browser sends whenever you
            visit our Service or when you access the Service by or through a
            mobile device (&quot;Log Data&quot;). This Log Data may include information
            such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser
            type, browser version, the pages of our Service that you visit, the
            time and date of your visit, the time spent on those pages, and other
            statistics.
          </p>

          <h3 className="font-headline">Use of Data</h3>
          <p>SproutGrow Agent uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
              when you choose to do so
            </li>
            <li>To provide customer care and support</li>
            <li>
              To provide analysis or valuable information so that we can improve
              the Service
            </li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h3 className="font-headline">Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
