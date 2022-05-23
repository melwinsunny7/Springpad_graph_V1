import { BigInt } from "@graphprotocol/graph-ts"
import { FeePaidToTreasury, FundingDetails, FundTransferredToRWAO, RepaymentStatus } from "../generated/Sentrecieve/Sentrecieve"
import { Loan, LoanRepayment } from "../generated/schema"

export function handleFundingDetails( event: FundingDetails): void {
  let id = event.params.loanId
  let entity = Loan.load(id)

  if (!entity) {
    entity = new Loan(id)
    entity.id = event.params.loanId
  }
  entity.LoanId = event.params.loanId
  entity.AssetId = event.params.assetId
  entity.NFTId = event.params.LNFTId
  entity.rwaoId = event.params.rwaoId
  entity.RepaymentDate = event.params.repaymentDate
  entity.Tenure = event.params.tenure

  entity.save()
}

export function handleFundTransferredToRWAO(event: FundTransferredToRWAO): void {
  let id = event.params.loanId
  let entity = Loan.load(id)

  if (!entity) {
    entity = new Loan(id)
    entity.id = event.params.loanId
  }
  entity.LoanId = event.params.loanId
  entity.FundingStatus = event.params.fundTrasferred

  entity.save()
  
}

export function handleRepaymentStatus(event: RepaymentStatus): void {
  let id = event.params.loanId
  let entity = LoanRepayment.load(id)

  if (!entity) {
    entity = new LoanRepayment(id)
    entity.id = event.params.loanId
  }
  entity.LoanId = event.params.loanId
  entity.RepaymentStatus = event.params.repaymentStatus

  entity.save()

}

export function handleFeePaidToTreasury(event: FeePaidToTreasury): void {
  let id = event.params.loanId
  let entity = LoanRepayment.load(id)

  if (!entity) {
    entity = new LoanRepayment(id)
    entity.id = event.params.loanId
  }
  entity.FeePaymentStatus = event.params.feePaymentStatus

  entity.save()
}
