import { pemilikBootcampTable } from "../database/schema/bootcamp";
import { updateTransaksiStatus } from "../repository/transaksi.repo";

export async function updateTransaksiStatusService(
  id: number,
  status: "Belum Dibayar" | "Sudah Dibayar" | "Sudah Diverif",
) {
  if (status === "Sudah Diverif") {
    const kode = await generateUniqueCode(
      pemilikBootcampTable,
      pemilikBootcampTable.kode,
      12,
    );

    await updateTransaksiStatus(id, status, undefined, kode);
  }

  await updateTransaksiStatus(id, status);
}
