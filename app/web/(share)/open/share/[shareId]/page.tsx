import PageHeading from "@/app/web/_components/page-heading";
import { getShareByIdAction } from "@/features/share-details/actions";

interface ViewSharePageProps {
  params: Promise<{
    shareId: string;
  }>;
}

export default async function ViewSharePage({ params }: ViewSharePageProps) {
  const { shareId } = await params;

  const response = await getShareByIdAction({ shareId });

  if (!response?.data?.success) return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h3>Share not found</h3>
        <p>It maybe either expired or there&apos;s mistake in share id.</p>
      </div>
    </div>
  )

  const share = response.data.data;

  console.log("Share - ", share);

  if (!share) return null;

  return (
    <>
      <PageHeading title={share.title} />
      
    </>
  )
}